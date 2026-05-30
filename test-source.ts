import { source } from './app/lib/source';
console.log(Object.keys(source));
console.log("pageTree type:", typeof source.pageTree);
const tree = source.pageTree;
console.log(JSON.stringify(tree, null, 2).substring(0, 2000));
