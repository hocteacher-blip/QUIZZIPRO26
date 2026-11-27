# QUIZZI ARENA PRO – Build fix report

## Confirmed errors from the supplied Vercel log

1. `src/App.tsx`: `watchAuth` was imported from `./lib/store`, but the function is exported by `./lib/firebase`.
2. `src/App.tsx`: callback parameter `u` was implicitly `any` as a consequence of the invalid import. Importing the correctly typed `watchAuth` gives it the `User | null` callback type.
3. `src/lib/store.ts`: `Record<string, unknown>` is not a valid Firestore update payload. It is now passed as `UpdateData<DocumentData>` after removing the `players` property from the patch.
4. `package.json`: explicitly approves install scripts for `esbuild`, `protobufjs`, and `@firebase/util`, which npm identified in the Vercel log.

## Verification status

- Source-level correction: applied.
- Dependency installation in this execution environment: not completed; npm registry access timed out.
- `npm run build`: not verified here because dependencies could not be installed.
- Vercel deployment: must be rerun after the corrected source is committed.

Do not describe this revision as fully production-tested until Vercel reports a successful build and the live app is exercised with Firebase configured.
