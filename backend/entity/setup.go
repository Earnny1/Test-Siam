package entity
import (

        "gorm.io/gorm"
        "gorm.io/driver/sqlite"

)

var db *gorm.DB
func DB() *gorm.DB {
        return db
}

func SetupDatabase() {
  database, err := gorm.Open(sqlite.Open("student.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }
  database.AutoMigrate(&Student{})
  db = database

  	db.Model(&Student{}).Create(&Student{
		Name: "Akash",
		Address: "Noida",
		Mark: 400,
		Tel: "020000000",
	})
	db.Model(&Student{}).Create(&Student{
		Name: "Mukessh",
		Address: "Delhi",
		Mark: 500,
		Tel: "020000001",
	})
	db.Model(&Student{}).Create(&Student{
		Name: "Anand",
		Address: "Ghaziabad",
		Mark: 500,
		Tel: "020000002",
	})
	db.Model(&Student{}).Create(&Student{
		Name: "Ajay",
		Address: "Lucknow",
		Mark: 400,
		Tel: "020000003",
	})
	db.Model(&Student{}).Create(&Student{
		Name: "Vijay",
		Address: "NCR",
		Mark: 150,
		Tel: "020000004",
	})
	db.Model(&Student{}).Create(&Student{
		Name: "Nikita",
		Address: "Patna",
		Mark: 240,
		Tel: "020000005",
	})
	db.Model(&Student{}).Create(&Student{
		Name: "Nisha",
		Address: "Okala",
		Mark: 900,
		Tel: "020000006",
	})
	db.Model(&Student{}).Create(&Student{
		Name: "Sanjay",
		Address: "Chandigarh",
		Mark: 760,
		Tel: "020000007",
	})

}