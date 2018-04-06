import * as jwt from "jsonwebtoken";

export class User {
    email: string;
    id: number;
    authorities: string[];

    static build(token: string) {
        return new Promise((resolve, reject) => {
            const user = new User();
            if (token.startsWith("Bearer ")) {
                token = token.substr(7);
            }
            try {
                let deserialiazed = jwt.verify(token, process.env['JWT_PUBLIC_KEY']);
                user.email = deserialiazed.user_name;
                user.id = deserialiazed.id;
                user.authorities = deserialiazed.authorities;
                resolve(user);
            } catch (err) {
                reject(err);
            }
        });
    };
}
