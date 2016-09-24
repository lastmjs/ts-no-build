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
    var stringsToReplace = typePositionList.map(function (typePosition) {
        return text.substring(typePosition.start - 1, typePosition.end);
    });
    return stringsToReplace.reduce(function (prev, curr) {
        return prev.replace(curr, "/*" + curr + "*/");
    }, text);
}
