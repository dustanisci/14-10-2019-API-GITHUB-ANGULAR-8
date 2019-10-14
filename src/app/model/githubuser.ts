export interface IGithubUser {
    name: string;
    private: boolean;
    html_url: string;
    description: string;
    language: string;
}

export class GithubUser {
    name: string;
    isPrivate: boolean;
    url: string;
    description: string;
    language: string;

    constructor(name: string, isPrivate: boolean, url: string, description: string, language: string) {
        this.name = name;
        this.isPrivate = isPrivate;
        this.url = url;
        this.description = description;
        this.language = language;
    }
}
