import {Injectable} from "@nestjs/common";
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {CreateDocumentResponse} from "elasticsearch";
import {map} from "rxjs/operators";
import uuid4 from "uuid/v4";
import {Account} from "../model/domain";

@Injectable()
export class AccountsRepository {
    constructor(private readonly elasticSearchService: ElasticsearchService) {}

    public save(account: Account): Promise<CreateDocumentResponse> {
        return this.elasticSearchService.bulk({
            body: [account]
                .map(savedAccount => [{index: {_index: "accounts", _id: uuid4()}}, savedAccount])
                .reduce((left, right) => left.concat(right)),
            index: "accounts",
            type: "_doc"
        })
            .toPromise()
    }

    public findAll(): Promise<Account[]> {
        return this.elasticSearchService.search<Account>({
            index: "accounts",
            size: 1000
        })
            .pipe(map(searchResponse => searchResponse[0].hits.hits.map(hit => hit._source)))
            .toPromise()
    }

    public findByAddress(address: string): Promise<Account[]> {
        return this.elasticSearchService.search<Account>({
            index: "accounts",
            body: {
                query: {
                    match: {
                        address
                    }
                }
            }
        })
            .pipe(map(searchResponse => searchResponse[0].hits.hits.map(hit => hit._source)))
            .toPromise();
    }

    public findByUser(userId: string): Promise<Account[]> {
        return this.elasticSearchService.search<Account>({
            index: "accounts",
            body: {
                query: {
                    match: {
                        userId
                    }
                }
            }
        })
            .pipe(map(searchResponse => searchResponse[0].hits.hits.map(hit => hit._source)))
            .toPromise()
    }
}
