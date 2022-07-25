import { List } from "@raycast/api";

import { useObsidianVaults } from "./utils/utils";
import { VaultSelection } from "./components/VaultSelection";
import { Vault } from "./utils/interfaces";
import { NoVaultFoundMessage } from "./components/NoVaultFoundMessage";
import { noVaultPathsToast } from "./components/Toasts";
import { MediaGrid } from "./components/MediaGrid";

export default function Command() {
  const { vaults, ready } = useObsidianVaults();

  if (!ready) {
    return <List isLoading={true}></List>;
  } else if (vaults.length === 0) {
    return <NoVaultFoundMessage />;
  } else if (vaults.length > 1) {
    return <VaultSelection vaults={vaults} target={(vault: Vault) => <MediaGrid vault={vault} />} />;
  } else if (vaults.length == 1) {
    return <MediaGrid vault={vaults[0]} />;
  } else {
    noVaultPathsToast();
    return <List />;
  }
}