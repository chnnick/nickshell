// Pure app/action types. No React, no content imports — safe for the logic
// layer (fileSystem / commandProcessor) to depend on.

// "Apps" are full-screen modals launched like executables / openable files
// (resume.pdf -> resume modal, ./mystery -> gallery modal).
export type AppId = 'gallery' | 'resume';

export type AppAction = { kind: 'app'; app: AppId };
