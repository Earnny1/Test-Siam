package entity
import (
  "gorm.io/gorm"
)
type Student struct {
  gorm.Model
  Name    	string
  Address  	string
  Mark     	uint16
  Tel       string

}