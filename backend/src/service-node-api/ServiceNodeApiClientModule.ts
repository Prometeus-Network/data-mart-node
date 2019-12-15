import {Global, Module} from "@nestjs/common";
import Axios from "axios";
import {ServiceNodeApiClient} from "./ServiceNodeApiClient";
import {config} from "../config";

@Global()
@Module({
    providers: [
        {
            provide: "serviceNodeApiAxios",
            useValue: Axios.create({
                baseURL: config.SERVICE_NODE_API_URL
            })
        },
        ServiceNodeApiClient
    ],
    exports: [
        ServiceNodeApiClient
    ]
})
export class ServiceNodeApiClientModule {}
