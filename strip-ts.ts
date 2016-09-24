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
    return typePositionList.reduce((prev, curr) => {
        console.log(prev.text);
        console.log(curr);
        console.log(prev.removedLength);
        return {
            text: prev.text.replace(prev.text.substring(curr.start - prev.removedLength - 1, curr.end - prev.removedLength), ''),
            removedLength: curr.end - curr.start + 1
        };
    }, {
        text,
        removedLength: 0
    }).text;
}
