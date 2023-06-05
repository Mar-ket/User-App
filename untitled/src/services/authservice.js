import axios from "axios";


export class AuthService {
    constructor(auth_url, entities_url) {
        this._auth_service = axios.create({
            baseURL: auth_url,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            },
        });
        this._entities_service = axios.create({
            baseURL: entities_url,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            },
        })
    }

    async login(username, password, provider) {
        let userId = '';
        await this._auth_service.post("/api/v1/login", {
            username: username, password: password, provider: provider,
        }).catch(function (error) {
            if (error.status === 401) {
                alert("invalid Token");
                return;
            }
            if (error.status === 400) {
                console.log("There probably is a problem with the data body");
            } else console.log(error)
        }).then(function (resp) {
            if (resp.status === 200) {
                localStorage.setItem("user", JSON.stringify(resp.data));
                localStorage.setItem("refresh_token", resp.data.refresh_token);
                localStorage.setItem("token", resp.data.token);
                userId = resp.data.id;
                axios.get(`http://localhost:8000/entities/entity/external/${userId}`)
                    .then(function (respE) {
                        localStorage.setItem("username", respE.data.name);
                        localStorage.setItem("uId", respE.data.id);
                    })
                    .catch(function (err) {
                        alert(err)
                    })
            }

        })
        return userId !== '';
    }

    logout() {
        localStorage.removeItem("user");
        this._auth_service.post('/api/v1/logout', {
        }, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        } )
    }

    register(firstName, lastName, nif, email, password, phoneNo, address, id, description) {
        return this._auth_service.post("api/v1/signup", {
            "isPartner": 0,
            "name": firstName + lastName,
            "address": address,
            "description": description,
            "homePage": "",
            "phoneNo": phoneNo,
            "nif": nif,
            "sku_list": '[]',
            "externalID": id
        });
    }

    getCurrentUser() {
        return localStorage.getItem('username');
    }
}

export default AuthService;