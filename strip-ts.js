"use strict";
var ts = require("typescript");
var originalTypeScript = "\n    const monkey: string = 'hello';\n    const hello: number = 5;\n";
var sourceFile = ts.createSourceFile('test-file.ts', originalTypeScript, ts.ScriptTarget.Latest);
console.log(sourceFile);
var typePositionList = [];
ts.forEachChild(sourceFile, function (node) {
    if (node.declarationList) {
        node.declarationList.declarations.forEach(function (declaration) {
            typePositionList.push({
                start: declaration.type.pos,
                end: declaration.type.end
            });
        }, []);
    }
});
console.log(typePositionList);
var es6 = commentOutTypeScript(sourceFile.text, typePositionList);
console.log(es6);
function commentOutTypeScript(text, typePositionList) {
    return typePositionList.reduce(function (prev, curr) {
        console.log(prev.text);
        console.log(curr);
        console.log(prev.removedLength);
        return {
            text: prev.text.replace(prev.text.substring(curr.start - prev.removedLength - 1, curr.end - prev.removedLength), ''),
            removedLength: curr.end - curr.start + 1
        };
    }, {
        text: text,
        removedLength: 0
    }).text;
}
