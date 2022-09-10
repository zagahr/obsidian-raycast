import { List, showToast, Toast, popToRoot, closeMainWindow } from "@raycast/api";

import fs from "fs";
import { useObsidianVaults } from "./utils/utils";
import { NoteListObsidian } from "./components/NoteList/NoteListObsidian";
import { VaultSelection } from "./components/VaultSelection";
import { Vault, SearchArguments } from "./utils/interfaces";
import { NoVaultFoundMessage } from "./components/NoVaultFoundMessage";
import { noVaultPathsToast } from "./components/Toasts";

export default function Command(props: { arguments: SearchArguments }) {
  const { ready, vaults } = useObsidianVaults();

  if (!ready) {
    return <List isLoading={true} />;
  } else if (vaults.length === 0) {
    return <NoVaultFoundMessage />;
  } else if (vaults.length >= 1) {
    const fs = require('fs');

    var file = "Users/timonblask/repos/obsidian-vault/Software\ Engineering/Vocabulary.md"

    console.log(props.arguments)
    var content = 
`
**${props.arguments.searchArgument}**
> ${props.arguments.tagArgument}

`
    fs.appendFile(file, content, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    
    showToast({
      title: "Done",
      message: "Added new entry to Vocabulary.md",
      style: Toast.Style.Failure,
    });

    popToRoot()
    closeMainWindow()
  } else {
    noVaultPathsToast();
  }
}
