import {Injectable} from "@nestjs/common";
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {SavedFileKey} from "../model/domain";
import {map} from "rxjs/operators";

@Injectable()
export class FileKeysRepository {
    constructor(private readonly elasticSearchService: ElasticsearchService) {
    }

    public saveAll(filesKeys: SavedFileKey[]): Promise<void> {
        return this.elasticSearchService.bulk({
            // have to use @ts-ignore because for some reason Intellij IDEA can't see that arrays actually have flatMap method
            // @ts-ignore
            body: filesKeys.flatMap(file => [{index: {_index: "file_keys", _id: file.id}}, file]),
            index: "file_keys",
            type: "_doc"
        })
            .toPromise()
    }

    public findByFileId(fileId: string): Promise<SavedFileKey[]> {
        return this.elasticSearchService.search<SavedFileKey>({
            index: "file_keys",
            body: {
                query: {
                    match: {
                        fileId
                    }
                }
            }
        })
            .pipe(map(searchResponse => searchResponse[0].hits.hits.map(hit => hit._source)))
            .toPromise();
    }

    public refreshIndex(): Promise<void> {
        return this.elasticSearchService.getClient().indices.refresh({
            index: "file_keys"
        })
    }
}