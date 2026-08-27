# Node built-in modules notes

## Asynchronous operations

`fs.readFile()` and `fs.writeFile()` are asynchronous. Node.js starts these file operations and continues running the remaining code instead of waiting for them to finish. Therefore, the operating-system information may appear in the terminal before the file-operation messages.

## Security considerations

- Only read or write files that the application is allowed to access.
- Validate file paths supplied by users to prevent access to unintended files.
- Handle errors so that the application does not crash or expose sensitive details.
- Avoid overwriting important files without confirmation or validation.
- Hostnames and other operating-system details can reveal information about a computer, so they should not be exposed publicly without a good reason.
