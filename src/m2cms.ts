import process from 'process';
import fs from 'node:fs';
import path from 'node:path';
import Typescript, {
    type Node,
    type InterfaceDeclaration,
    type PropertySignature,
    type Identifier
} from 'typescript';
import YAML from 'yaml';

import Debug from 'debug';
const DEBUG = Debug('m2cms')

const KIND = (e: Node | undefined ) => e && Typescript.SyntaxKind[e.kind]

interface Field {
    label: string;
    name: string;
    widget: string;
    fields?: Field[];
}

interface Collection {
    name: string;
    label: string;
    folder: string;
    widget: string;
    create: boolean;
    slug: string;
    fields: Field[];
}

interface Config {
    local_backend?: boolean;
    backend?: {
        name: string;
        repo: string;
        branch?: string;
    }
    publish_mode?: string;
    media_folder: string;
    collections: Collection[];
}


function parsePropertySignature(ps: PropertySignature, ancestors: string[] = []) : Field | null {
    const name = (ps.name as Identifier).escapedText.toString();
    const config = {
        name,
        label: [...ancestors, name].join(' '),
        required: !!!ps.questionToken
    }

    switch(ps && ps.type && ps.type.kind) {
        case Typescript.SyntaxKind.StringKeyword:
            return {
                ...config,
                widget: "string"
            }
        case Typescript.SyntaxKind.NumberKeyword:
            return {
                ...config,
                widget: "number"
            }
        case Typescript.SyntaxKind.ObjectKeyword:
            return {
                ...config,
                widget: "object"
            }
        case Typescript.SyntaxKind.TupleType:
            return {
                ...config,
                widget: "list"
            }
        case Typescript.SyntaxKind.TypeLiteral:
            return parseNode(ps, [...ancestors, name])
        case Typescript.SyntaxKind.TypeReference:
            return collections[name]
        default:
            DEBUG('unhandled type', KIND(ps.type), ps, collections)
            throw "Type Error"
    }
    return null;
}

function parseNode(node : Node, ancestors: string[] = []): Collection {

    const fields : Field[] = []
    node.forEachChild((child: Node) => {
        switch (child.kind) {
            case Typescript.SyntaxKind.InterfaceDeclaration:
                const id = (child as InterfaceDeclaration)
                fields.push(parseNode(child, [...ancestors, id.name.escapedText || 'id']))
                break;

            case Typescript.SyntaxKind.PropertySignature:
                const ps = (child as PropertySignature);
                const field = parsePropertySignature(ps, ancestors);
                if (field)
                    fields.push(field)
                break;

            case Typescript.SyntaxKind.TypeLiteral:
                fields.push( parseNode(child, [...ancestors, 'literal']))
                break;
            default:
                DEBUG('ignoring', KIND(child))
        }
    })

    DEBUG("PARSE NODE", ancestors, fields);
    return {
        name: ancestors.join('_').toLowerCase(),
        label: ancestors.join(' '),
        folder: `./data/${ancestors.join('/')}`,
        slug: `{{${fields[0].name}}}.json`,
        create: true,
        widget: "object",
        fields
    }
}

const dir : string = process.argv.pop() || './';
const configFile = process.argv.pop() || './config.yaml';
const config : Config = YAML.parse(fs.readFileSync(configFile).toString())
const collections : Record<string, Collection> = {}
for (let c of config.collections) {
    collections[c.label] = c
}

const readAll = (dir: string) => {
    for (let f of fs.readdirSync(dir.toString())) {
        DEBUG(`reading file: ${dir}/${f}`)
        const node = Typescript.createSourceFile(f, fs.readFileSync(path.join(dir, f), 'utf-8'), Typescript.ScriptTarget.Latest)
        node.forEachChild(child => {
            if (child.kind === Typescript.SyntaxKind.InterfaceDeclaration) {
                const id = (child as InterfaceDeclaration);
                const name = id.name.escapedText.toString();
                collections[name] = {
                    ...parseNode(child, [name]),
                    ...(collections[name] || {})
                }
            }
        })
    }
}

readAll(dir)

config.collections = Object.values(collections)
console.log(YAML.stringify(config))
