function doGet() {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Food Composition Calculator</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }

            header {
                background-color: #333;
                color: #fff;
                text-align: center;
                padding: 20px 0;
            }

            h1 {
                font-size: 2rem;
            }

            .container {
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
            }

            .food-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #ccc;
                padding: 10px 0;
            }

            .food-item-details {
                flex: 1;
            }

            h2 {
                font-size: 1.5rem;
            }

            p {
                margin: 0;
            }

            .nutrition {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }

            .nutrition-label {
                font-weight: bold;
            }

           #nutrition-chart {
                width: 100%;
                height: 300px;
            }
        </style>
    </head>

    <body>
        <header>
            <h1>Food Composition Calculator</h1>
        </header>
        <div class="container">
            <div class="food-item">
                <label for="food-dropdown">Select Food Item:</label>
                <select id="food-dropdown" onchange="updateNutrition()">
                    <option value="potato">Potato</option>
                    <option value="tomato">Tomato</option>
                    <option value="cucumber">Cucumber</option>
                    <option value="cake">Cake</option>
                    <option value="chocolate">Chocolate</option>
                    <option value="doughnut">Doughnut</option>
                    <option value="soda">Soda</option>
                    <option value="potatochips">Potato chips</option>
                    <option value="pizza">Pizza</option>
                    <option value="burger">Burger</option>
                    <option value="pasta">Pasta</option>
                    <option value="whitebread">White bread</option>
                    <option value="icecream">Ice-cream</option>
                    <option value="cereals">Cereals</option>
                    <option value="lettuce">Lettuce</option>
                    <option value="chilli">Chilli</option>
                    <option value="biscuits">Biscuits</option>
                    <option value="processedmeat">Processed Meat</option>
                    <option value="egg">Egg</option>
                    <option value="alcoholicdrink">Alcoholic Drink</option>
                    <option value="sandwich">Sandwich</option>
                    <option value="butter">Butter</option>
                    <option value="samosa">Samosa</option>
                    <option value="jalebi">Jalebi</option>
                    <option value="panipuri">Pani Puri</option>
                    <option value="ketchup">Ketchup</option>
                    <option value="brownies">Brownies</option>
                    <option value="muffins">Muffins</option>
                    <option value="cheesecakes">Cheese Cakes</option>
                    <option value="custards">Custards</option>
                    <option value="tiramisucake">Tiramisu Cake</option>
                    <option value="pastries">Pastries</option>
                    <option value="pie">Pie</option>
                    <option value="pudding">Pudding</option>
                    <option value="frozenyogurt">Frozen Yogurt</option>
                    <option value="fudge">Fudge</option>
                </select>
            </div>
            <div class="food-item-details">
                <h2 id="food-name"></h2>
                <p>A starchy vegetable.</p>
            </div>
            <div class="nutrition">
                <span class="nutrition-label">Carbohydrates (g):</span>
                <span id="carbs">0</span>
            </div>
            <div class="nutrition">
                <span class="nutrition-label">Proteins (g):</span>
                <span id="proteins">0</span>
            </div>
            <div class="nutrition">
                <span class="nutrition-label">Fats (g):</span>
                <span id="fats">0</span>
            </div>
            <div class="nutrition">
                <span class="nutrition-label">Lipids (g):</span>
                <span id="lipids">0</span>
            </div>
            <div class="nutrition">
                <span class="nutrition-label">Cholesterol (mg):</span>
                <span id="cholesterol">0</span>
            </div>
            <div class="nutrition">
                <span class="nutrition-label">Calories:</span>
                <span id="calories">0</span>
            </div>
            <label for="weight">Weight (g):</label>
            <input type="number" id="weight" oninput="updateNutrition()">
            <canvas id="nutrition-chart"></canvas>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
            const foodData = {
                potato: {
                    name: "Potato",
                    carbs: 20,
                    proteins: 2,
                    fats: 0,
                    lipids: 0,
                    cholesterol: 0,
                    calories: 90
                },
                tomato: {
                    name: "Tomato",
                    carbs: 5.96,
                    proteins: 17.71,
                    fats: 0.2,
                    lipids: 4.96,
                    cholesterol: 0,
                    calories: 22
                },
                lettuce: {
                    name: "Lettuce",
                    carbs: 2.9,
                    proteins: 1.4,
                    fats: 0.2,
                    lipids: 0.2,
                    cholesterol: 0,
                    calories: 15
                },
                chilli: {
                    name: "Chilli",
                    carbs: 4,
                    proteins: 0.8,
                    fats: 0.2,
                    lipids: 0.2,
                    cholesterol: 0,
                    calories: 18
                },
                biscuits: {
                    name: "Biscuits",
                    carbs: 6,
                    proteins: 1,
                    fats: 2.3,
                    lipids: 5.98,
                    cholesterol: 0.4,
                    calories: 357
                },
                processedmeat: {
                    name: "Processed Meat",
                    carbs: 5,
                    proteins: 16.9,
                    fats: 10,
                    lipids: 10,
                    cholesterol: 76.0,
                    calories: 1830
                },
                egg: {
                    name: "Egg",
                    carbs: 1.1,
                    proteins: 13,
                    fats: 11,
                    lipids: 11,
                    cholesterol: 373,
                    calories: 155
                },
                alcoholicdrink: {
                    name: "Alcoholic Drink",
                    carbs: 3.6,
                    proteins: 0.5,
                    fats: 0,
                    lipids: 0,
                    cholesterol: 0,
                    calories: 43
                },
                sandwich: {
                    name: "Sandwich",
                    carbs: 27.2,
                    proteins: 19.3,
                    fats: 26.3,
                    lipids: 12,
                    cholesterol: 47,
                    calories: 250
                },
                butter: {
                    name: "Butter",
                    carbs: 0.1,
                    proteins: 0.9,
                    fats: 81,
                    lipids: 81,
                    cholesterol: 215,
                    calories: 717
                },
                samosa: {
                    name: "Samosa",
                    carbs: 24,
                    proteins: 3.5,
                    fats: 24,
                    lipids: 25,
                    cholesterol: 27,
                    calories: 262
                },
                jalebi: {
                    name: "Jalebi",
                    carbs: 5.6,
                    proteins: 0.2,
                    fats: 2.2,
                    lipids: 2.2,
                    cholesterol: 0,
                    calories: 44
                },
                panipuri: {
                    name: "Pani Puri",
                    carbs: 30,
                    proteins: 5.4,
                    fats: 5.2,
                    lipids: 0,
                    cholesterol: 0.1,
                    calories: 36
                },
                ketchup: {
                    name: "Ketchup",
                    carbs: 26,
                    proteins: 1.3,
                    fats: 0.2,
                    lipids: 0.2,
                    cholesterol: 0,
                    calories: 112
                },
                brownies: {
                    name: "Brownies",
                    carbs: 50,
                    proteins: 6,
                    fats: 29,
                    lipids: 5,
                    cholesterol: 73,
                    calories: 466
                },
                muffins: {
                    name: "Muffins",
                    carbs: 54,
                    proteins: 4.5,
                    fats: 16,
                    lipids: 16,
                    cholesterol: 30,
                    calories: 377
                },
                cheesecakes: {
                    name: "Cheese Cakes",
                    carbs: 26,
                    proteins: 6,
                    fats: 23,
                    lipids: 23,
                    cholesterol: 55,
                    calories: 321
                },
                custards: {
                    name: "Custards",
                    carbs: 18,
                    proteins: 4,
                    fats: 4,
                    lipids: 8.9,
                    cholesterol: 51,
                    calories: 122
                },
                tiramisucake: {
                    name: "Tiramisu Cake",
                    carbs: 38.3,
                    proteins: 8.6,
                    fats: 30,
                    lipids: 17,
                    cholesterol: 214,
                    calories: 513
                },
                pastries: {
                    name: "Pastries",
                    carbs: 45,
                    proteins: 7,
                    fats: 38,
                    lipids: 10,
                    cholesterol: 0,
                    calories: 551
                },
                pie: {
                    name: "Pie",
                    carbs: 31,
                    proteins: 2,
                    fats: 12,
                    lipids: 12,
                    cholesterol: 138,
                    calories: 240
                },
                pudding: {
                    name: "Pudding",
                    carbs: 210,
                    proteins: 3.2,
                    fats: 3.2,
                    lipids: 1.8,
                    cholesterol: 9,
                    calories: 120
                },
                frozenyogurt: {
                    name: "Frozen Yogurt",
                    carbs: 24,
                    proteins: 4,
                    fats: 6,
                    lipids: 3.4,
                    cholesterol: 2,
                    calories: 159
                },
                cake: {
                    name: "Cake",
                    carbs: 56.4,
                    proteins: 3.4,
                    fats: 28.6,
                    lipids: 16.8,
                    cholesterol: 49,
                    calories: 412
                },
                chocolate: {
                    name: "Chocolate",
                    carbs: 60,
                    proteins: 5.3,
                    fats: 33.9,
                    lipids: 21,
                    cholesterol: 13,
                    calories: 546
                },
                doughnut: {
                    name: "Doughnut",
                    carbs: 50,
                    proteins: 5,
                    fats: 30,
                    lipids: 10,
                    cholesterol: 0,
                    calories: 452
                  },
                soda: {
                    name: "Soda",
                    carbs: 39,
                    proteins: 0,
                    fats: 0,
                    lipids: 0,
                    cholesterol: 0,
                    calories: 150
                },
                cucumber: {
                    name: "Cucumber",
                    carbs: 3.63,
                    proteins: 0.65,
                    fats: 0.11,
                    lipids: 0.05,
                    cholesterol: 0,
                    calories: 15
                },

                potatochips: {
                    name: "Potato Chips",
                    carbs: 15,
                    proteins: 2,
                    fats: 10,
                    lipids: 3,
                    cholesterol: 0,
                    calories: 152
                },
                pizza: {
                  name: "Pizza",
                  carbs: 29,
                  proteins: 12,
                  fats: 14,
                    lipids: 7,
                    cholesterol: 31,
                  calories: 285
                },
                burger: {
                    name: "Burger",
                    carbs: 39,
                    proteins: 12,
                    fats: 17,
                    lipids: 8,
                    cholesterol: 29,
                    calories: 303
                },
                pasta: {
                    name: "Pasta",
                    carbs: 37,
                    proteins: 6,
                    fats: 2,
                    lipids: 1,
                    cholesterol: 0,
                    calories: 157
                },
                whitebread: {
                    name: "White Bread",
                    carbs: 13,
                    proteins: 2,
                    fats: 1,
                    lipids: 0,
                    cholesterol: 0,
                    calories: 67
                },
                icecream: {
                    name: "Ice Cream",
                    carbs: 21,
                    proteins: 3,
                    fats: 10,
                    lipids: 6,
                    cholesterol: 53,
                    calories: 207
                },
                cereals: {
                    name: "Cereals",
                    carbs: 44,
                    proteins: 8,
                    fats: 1,
                    lipids: 0,
                    cholesterol: 0,
                    calories: 186
                },
                fudge: {
                    name: "Fudge",
                    carbs: 76,
                    proteins: 2.4,
                    fats: 10,
                    lipids: 6,
                    cholesterol: 14,
                    calories: 411
                }
            };

            const ctx = document.getElementById("nutrition-chart").getContext("2d");
            const chart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Carbohydrates (g)", "Proteins (g)", "Fats (g)", "Lipids (g)", "Cholesterol (mg)", "Calories"],
                    datasets: [{
                        label: "Nutritional Composition",
                        data: [0, 0, 0, 0, 0, 0],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                    }]
                },
                        options: {
                          scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                  });

                  function updateNutrition() {
                      const foodDropdown = document.getElementById("food-dropdown");
                      const selectedFood = foodDropdown.value;
                      const selectedFoodData = foodData[selectedFood];
                      const weight = parseFloat(document.getElementById("weight").value);

                      if (isNaN(weight)) {
                          return;
                      }

                        const carbs = (selectedFoodData.carbs * weight) / 100;
                      const proteins = (selectedFoodData.proteins * weight) / 100;
                        const fats = (selectedFoodData.fats * weight) / 100;
                      const lipids = (selectedFoodData.lipids * weight) / 100;
                        const cholesterol = (selectedFoodData.cholesterol * weight) / 100;
                        const calories = (selectedFoodData.calories * weight) / 100;

                        document.getElementById("food-name").textContent = selectedFoodData.name;
                        document.getElementById("carbs").textContent = carbs.toFixed(2) + 'g';
                        document.getElementById("proteins").textContent = proteins.toFixed(2) + 'g';
                        document.getElementById("fats").textContent = fats.toFixed(2) + 'g';
                        document.getElementById("lipids").textContent = lipids.toFixed(2) + 'g';
                        document.getElementById("cholesterol").textContent = cholesterol.toFixed(2);
                        document.getElementById("calories").textContent = calories.toFixed(2);



                        chart.data.datasets[0].data = [carbs, proteins, fats, lipids, cholesterol, calories];
                        chart.update();
                  }

                    updateNutrition();  // Initial update

                    document.getElementById("food-dropdown").addEventListener("change", updateNutrition);
                    document.getElementById("weight").addEventListener("input", updateNutrition);
                  });
        </script>
      </body>
    </html>`;

  return HtmlService.createHtmlOutput(htmlContent)
    .setTitle('Food Composition Calculator')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
