export class User {
    nickName: string;
    avatar: string;

    constructor(nickname: string, picture: string){
        this.nickName = nickname;
        this.avatar = picture;
    }
}