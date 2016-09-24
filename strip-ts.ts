import * as ts from "typescript";

const originalTypeScript = `
    const monkey: string = 'hello';
    const hello: number = 5;
`;

const sourceFile = ts.createSourceFile('test-file.ts', originalTypeScript, ts.ScriptTarget.Latest);

console.log(sourceFile)

let typePositionList = [];
ts.forEachChild(sourceFile, (node: ts.Node) => {
    if (node.declarationList) {
        node.declarationList.declarations.forEach((declaration: ts.Node) => {
            typePositionList.push({
                start: declaration.type.pos,
                end: declaration.type.end
            });
        }, []);
    }
});

console.log(typePositionList);

const es6 = commentOutTypeScript(sourceFile.text, typePositionList);

console.log(es6);

function commentOutTypeScript(text: string, typePositionList) {
    const stringsToReplace = typePositionList.map((typePosition) => {
        return text.substring(typePosition.start - 1, typePosition.end);
    });

    return stringsToReplace.reduce((prev, curr) => {
        return prev.replace(curr, `/*${curr}*/`);
    }, text);
}
