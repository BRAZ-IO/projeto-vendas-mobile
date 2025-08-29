// This file is a workaround for the TypeScript error: "Cannot find module '@expo/vector-icons' or its corresponding type declarations."
// This happens when node_modules are not correctly installed. A proper fix is to run `npm install` or `yarn`.
declare module '@expo/vector-icons';
