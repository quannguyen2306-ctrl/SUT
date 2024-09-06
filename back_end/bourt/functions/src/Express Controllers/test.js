const date = new Date(2024, 1, 14, 10, 0); 

for (let i = 0; i<=6; i++) { 
    const dateNew = new Date(date);
    dateNew.setDate(dateNew.getDate() + i); 
    console.log(i, dateNew, date)
}