import {
    AccountsStore,
    AccountsBalanceStore,
    AccountRegistrationStore,
} from "../Account";
import {DrawerStore} from "../AppBar";
import {SettingsStore} from "../Settings";
import {
    FilesListStore,
    FileInfoStore,
    FilesOfDataValidatorStore,
    PurchaseFileStore,
    FilesSearchStore
} from "../DataPurchase";
import {TransactionsStore} from "../Transaction";

export interface IAppState {
    store?: any, //needed for Mobx-router
    registration: AccountRegistrationStore,
    drawer: DrawerStore,
    settings: SettingsStore,
    accounts: AccountsStore,
    balances: AccountsBalanceStore,
    files: FilesListStore,
    filesOfDataValidator: FilesOfDataValidatorStore,
    filePurchase: PurchaseFileStore,
    fileInfo: FileInfoStore,
    filesSearch: FilesSearchStore,
    transactions: TransactionsStore
}
