
class Tokens {

    setToken( tokens : Record<string, string>):void{
      localStorage.setItem("access",  tokens.access);
      localStorage.setItem("refresh",  tokens.refresh)
    }
    getToken():Record<string, string>{


        return {
            "access":localStorage.getItem("access")!,
            "refresh":localStorage.getItem("refresh")!
        }
    }
}

export const singletonTokenInstance = new Tokens();

Object.freeze(singletonTokenInstance);
