import {forwardRef, Module} from "@nestjs/common";
import {AccountsController} from "./AccountsController";
import {AccountsService} from "./AccountsService";
import {AccountsRepository} from "./AccountsRepository";
import {InitialAccountRegistrationHandler} from "./InitialAccountRegistrationHandler";
import {UsersRepository} from "./UsersRepository";
import {ServiceNodeApiClientModule} from "../service-node-api";
import {Web3Module} from "../web3";
import {ElasticsearchInitializerModule} from "../elasticsearch/initializer";
import {WalletGeneratorModule} from "../wallet-generator";
import {AuthModule} from "../jwt-auth";

@Module({
    controllers: [AccountsController],
    providers: [AccountsService, AccountsRepository, InitialAccountRegistrationHandler, UsersRepository],
    imports: [
        ServiceNodeApiClientModule,
        Web3Module,
        ElasticsearchInitializerModule,
        WalletGeneratorModule,
        forwardRef(() => AuthModule)
    ],
    exports: [AccountsService, AccountsRepository, UsersRepository]
})
export class AccountsModule {}
