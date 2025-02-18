// import { javascript } from "npm:@codemirror/lang-javascript";
// import { EditorView, keymap } from "npm:@codemirror/view";
// import { button } from "npm:@observablehq/inputs";
// import { basicSetup } from "npm:codemirror";

// import octokit from "@octokit/rest";

// //  https://github.com/octokit/octokit.js`

// # First get the SHA of the default branch (e.g., main)
// curl -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
//      "https://api.github.com/repos/forkOwner/OriginalRepo/git/refs/heads/main"

// # Suppose it returns "object": { "sha": "ABC123..." }, use that in the next call
// curl -X POST \
//      -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
//      -d '{"ref":"refs/heads/my-proposed-change","sha":"ABC123..."}' \
//      "https://api.github.com/repos/forkOwner/OriginalRepo/git/refs"

//      curl -X PUT \
//           -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
//           -d '{
//                 "message": "Propose changes to docs",
//                 "content": "'"$BASE64_CONTENT"'",
//                 "branch": "my-proposed-change"
//               }' \
//           "https://api.github.com/repos/forkOwner/OriginalRepo/contents/docs/README.md"

//           curl -X POST \
//                -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
//                -d '{
//                      "title": "Propose edits to the documentation",
//                      "head": "forkOwner:my-proposed-change",
//                      "base": "main",
//                      "body": "Here is a summary of my changes..."
//                    }' \
//                "https://api.github.com/repos/OriginalOwner/OriginalRepo/pulls"

// export function Editor({
//   value = "",
//   style = "font-size: 14px; position: absolute; top:0; right:0; border: 1px solid green;",
// } = {}) {
//   const parent = document.createElement("div");
//   parent.style = style;
//   parent.value = value;

//   const run = () => {
//     parent.value = String(editor.state.doc);
//     parent.dispatchEvent(new InputEvent("input", { bubbles: true }));
//   };

//   const editor = new EditorView({
//     parent,
//     doc: value,
//     extensions: [
//       basicSetup,
//       javascript(),
//       keymap.of([
//         { key: "Shift-Enter", preventDefault: true, run },
//         { key: "Mod-s", preventDefault: true, run },
//       ]),
//     ],
//   });

//   parent.addEventListener(
//     "input",
//     (event) => event.isTrusted && event.stopImmediatePropagation(),
//   );
//   parent.appendChild(button([["Run", run]]));

//   return parent;
// }

// async function createBranch(forkOwner, forkName) {
//   // First, get the SHA of the default branch (e.g., main)
//   const defaultBranch = "main";
//   const refs = await octokit.rest.git.getRef({
//     owner: forkOwner,
//     repo: forkName,
//     ref: `heads/${defaultBranch}`,
//   });
//   const baseSha = refs.data.object.sha;

//   // Next, create a new branch ref (e.g., "my-proposed-change")
//   const newBranch = "my-proposed-change";
//   await octokit.rest.git.createRef({
//     owner: forkOwner,
//     repo: forkName,
//     ref: `refs/heads/${newBranch}`,
//     sha: baseSha,
//   });

//   console.log(`Branch created: ${newBranch}`);
//   return newBranch;
// }

// async function commitFileChange(forkOwner, forkName, branchName) {
//   const path = "docs/README.md";
//   const message = "Propose changes to docs";
//   const newContent = "Hello, world!"; // Replace with whatever content
//   const base64Content = Buffer.from(newContent).toString("base64");

//   // PUT /repos/{owner}/{repo}/contents/{path}
//   await octokit.rest.repos.createOrUpdateFileContents({
//     owner: forkOwner,
//     repo: forkName,
//     path,
//     message,
//     content: base64Content,
//     branch: branchName,
//     // If updating an existing file, pass `sha` of the existing file
//   });

//   console.log(`File updated: ${path} on branch ${branchName}`);
// }

// async function openPullRequest(forkOwner, forkName, branchName) {
//   const originalOwner = "OriginalOwner";
//   const originalRepo = "OriginalRepo";
//   const prTitle = "Propose edits to the documentation";
//   const prBody = "Here is a summary of my changes...";

//   // POST /repos/{owner}/{repo}/pulls
//   const pr = await octokit.rest.pulls.create({
//     owner: originalOwner,
//     repo: originalRepo,
//     title: prTitle,
//     head: `${forkOwner}:${branchName}`, // The fork + branch from the user
//     base: "main",                      // The branch in the original repo
//     body: prBody,
//   });

//   console.log(`Pull request created: ${pr.data.html_url}`);
// }

// async function proposeEdit() {
//   const { forkOwner, forkName } = await createFork();
//   const branchName = await createBranch(forkOwner, forkName);
//   await commitFileChange(forkOwner, forkName, branchName);
//   await openPullRequest(forkOwner, forkName, branchName);
// }

// proposeEdit().catch(err => {
//   console.error("Error proposing edit:", err);
// });

// # CodeMirror

// Here’s a basic editor powered by CodeMirror. Its value is exposed as `input`, and then the result of `eval`’ing `input` is shown below. Try editing the code and then running it with Shift-Enter or by clicking the Run button.

// ```js echo
// const input = view(Editor({value: "1 + 2"}));
// ```

// ```js echo
// eval(input)
// ```

// The editor is implemented in a component:

// ```js echo
// import {Editor} from "./components/Editor.js";
// ```

// The implementation looks like this:

// ```js run=false
// import {javascript} from "npm:@codemirror/lang-javascript";
// import {EditorView, keymap} from "npm:@codemirror/view";
// import {button} from "npm:@observablehq/inputs";
// import {basicSetup} from "npm:codemirror";

// export function Editor({
//   value = "",
//   style = "font-size: 14px;"
// } = {}) {
//   const parent = document.createElement("div");
//   parent.style = style;
//   parent.value = value;

//   const run = () => {
//     parent.value = String(editor.state.doc);
//     parent.dispatchEvent(new InputEvent("input", {bubbles: true}));
//   };

//   const editor = new EditorView({
//     parent,
//     doc: value,
//     extensions: [
//       basicSetup,
//       javascript(),
//       keymap.of([
//         {key: "Shift-Enter", preventDefault: true, run},
//         {key: "Mod-s", preventDefault: true, run}
//       ])
//     ]
//   });

//   parent.addEventListener("input", (event) => event.isTrusted && event.stopImmediatePropagation());
//   parent.appendChild(button([["Run", run]]));

//   return parent;
// }
// ```

// viewof proposeEdit = {
//   // Create a wrapper element (a form with a text area and button)
//   const wrapper = html`<form style="margin: 1em 0;">
//     <label style="display: block; margin-bottom: 0.5em;">
//       Proposed changes:
//       <textarea
//         name="proposal"
//         rows="5"
//         style="width: 100%; font-family: sans-serif; margin-top: 0.5em;"
//         placeholder="Describe your proposed edits..."
//       ></textarea>
//     </label>
//     <button type="submit" style="padding: 0.5em 1em; cursor: pointer;">
//       Propose Edit
//     </button>
//   </form>`;

//   // On form submission
//   wrapper.onsubmit = async (event) => {
//     event.preventDefault();

//     // Get user input from the text area
//     const proposedChanges = wrapper.proposal.value.trim();
//     if (!proposedChanges) {
//       alert("Please enter some text describing your proposed edit.");
//       return;
//     }

//     // “Currently viewed page” (works in many environments, including Observable)
//     const currentPage = location.href;

//     // 1) Create a Gist on GitHub to store the proposed edits
//     const gistPayload = {
//       description: `Proposed edits from Observable: ${currentPage}`,
//       public: false,
//       files: {
//         "proposal.md": {
//           content: `**Page:** ${currentPage}\n\n**Proposal:**\n\n${proposedChanges}`
//         },
//       },
//     };

//     let gistUrl;
//     try {
//       const gistResponse = await fetch(GIST_ENDPOINT, {
//         method: "POST",
//         headers: GITHUB_HEADERS,
//         body: JSON.stringify(gistPayload),
//       });
//       if (!gistResponse.ok) {
//         const error = await gistResponse.json();
//         throw new Error(error.message || "Failed to create Gist.");
//       }
//       const gistData = await gistResponse.json();
//       gistUrl = gistData.html_url;
//     } catch (err) {
//       alert(`Error creating Gist: ${err.message}`);
//       return;
//     }

//     // 2) Store metadata in Supabase (optional)
//     //    Suppose we have a table named "edits" with columns:
//     //      - id: primary key
//     //      - page_url: text
//     //      - proposal: text
//     //      - gist_url: text
//     const { data, error } = await supabase.from("edits").insert([
//       {
//         page_url: currentPage,
//         proposal: proposedChanges,
//         gist_url: gistUrl,
//       },
//     ]);

//     if (error) {
//       console.error("Error inserting into Supabase:", error);
//       alert("Error saving proposal in Supabase.");
//       return;
//     }

//     alert(`Proposal submitted!\nView gist: ${gistUrl}`);
//     // Clear the text area
//     wrapper.proposal.value = "";
//   };

//   return wrapper;
// }

// allProposals = (await supabase
//   .from("edits")
//   .select("*")
//   .order("id", { ascending: false })).data

// md`# All Proposals

// Below is a list of recent proposals from the "edits" table in Supabase.
// `

// html`
//   <table style="width: 100%; border-collapse: collapse;">
//     <thead>
//       <tr style="text-align: left; border-bottom: 1px solid #ccc;">
//         <th style="padding: 0.5em;">ID</th>
//         <th style="padding: 0.5em;">Page URL</th>
//         <th style="padding: 0.5em;">Proposal</th>
//         <th style="padding: 0.5em;">Gist</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${allProposals?.map(
//         (edit) => html`
//           <tr style="border-bottom: 1px solid #ccc;">
//             <td style="padding: 0.5em;">${edit.id}</td>
//             <td style="padding: 0.5em; max-width: 200px; overflow: hidden;">
//               <a href="${edit.page_url}" target="_blank">${edit.page_url}</a>
//             </td>
//             <td style="padding: 0.5em;">${edit.proposal}</td>
//             <td style="padding: 0.5em;">
//               <a href="${edit.gist_url}" target="_blank">View Gist</a>
//             </td>
//           </tr>
//         `
//       )}
//     </tbody>
//   </table>
// `
