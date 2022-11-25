
class Tokens {

    setToken( tokens : Record<"access" | "refresh", string>):void{
      localStorage.setItem("access",  tokens.access);
      localStorage.setItem("refresh",  tokens.refresh)
    }
    getToken():Record<"access" | "refresh", string>{


        return {
            "access":localStorage.getItem("access")!,
            "refresh":localStorage.getItem("refresh")!
        }
    }
}

export const singletonTokenInstance = new Tokens();

Object.freeze(singletonTokenInstance);
