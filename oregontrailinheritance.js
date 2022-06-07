class Traveler {
    constructor(name, food=1, isHealthy=true){
        this.name = name
        this.food = food
        this.isHealthy = isHealthy
    }

    hunt(){
        return this.food+=2
    }

    eat(){
        if(this.food > 0){
            this.food -= 1
            return this.isHealthy=true
        }
        return this.isHealthy=false
    }
}

class Wagon {
    constructor(capacity) {
        this.capacity = capacity
        this.passengers = []
    }

    getAvailableSeatCount(){
        return this.capacity - this.passengers.length
    }

    join(traveler){
        this.getAvailableSeatCount() > 0 ? this.passengers.push(traveler) : null
    }

    shouldQuarantine(){
        return this.passengers.some(passageiro => passageiro.isHealthy==false)
    }

    totalFood(){
        const total = this.passengers.reduce((acc, passenger) => acc + passenger.food,0)
        return total
    }
}

class Hunter extends Traveler {
    constructor(name, food=2, isHealthy=true) {
        super(name, food, isHealthy)
    }

    hunt() {
        return this.food+=5
    }

    eat() {
        if(this.food > 1){
            this.food -= 2
        }else if (this.food == 1){
            this.food -= 1
            return this.isHealthy = false
        }else {
            return this.isHealthy = false
        }
    }

    giveFood(traveler, numOfFoodUnits) {
        if (numOfFoodUnits <= this.food){
            traveler.food += numOfFoodUnits
            this.food -= numOfFoodUnits
        }    
    }
}

class Doctor extends Traveler{
    constructor(name, food=1, isHealthy=true) {
        super(name, food, isHealthy)
    }

    heal(traveler){
        traveler.isHealthy == false ? traveler.isHealthy = true : traveler.isHealthy = true
    }
}

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);