type WHO = "player" | "opponent";

class Scoreboard {
    setPoint(who: WHO, amount: number) {
        const key = `scoreboard_${who}`;
        const value = Number(localStorage.getItem(key));
        localStorage.setItem(key, (!isNaN(value) ? value : amount).toString());
    }

    addPoint(who: WHO | "draw", amount = 1) {
        console.log("addPoint", who, amount);
        if (who !== "draw") {
            this.setPoint(who, this.getPoint(who) + amount);
        } else {
            this.setPoint("player", this.getPoint("player") + 1);
            this.setPoint("opponent", this.getPoint("opponent") + 1);
        }
    }

    getPoint(who: WHO) {
        const key = `scoreboard_${who}`;
        const value = Number(localStorage.getItem(key));
        console.log("getPoint", key, value);
        return !isNaN(value) ? value : 0;
    }

    reset() {
        localStorage.setItem("scoreboard_player", "0");
        localStorage.setItem("scoreboard_opponent", "0");
    }
}

export default Scoreboard;
