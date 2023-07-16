package controller

import (
	"net/http"

	"github.com/Earnny1/tase-siam/entity"
	"github.com/gin-gonic/gin"
)

func CreateStudent(c *gin.Context) {

	var student entity.Student

	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

func GetStudent(c *gin.Context) {
	var student entity.Student
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM students WHERE id = ?", id).Scan(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

func ListStudents(c *gin.Context) {
	var students []entity.Student
	if err := entity.DB().Raw("SELECT * FROM students").Scan(&students).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": students})
}

func DeleteStudent(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "students not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateStudent(c *gin.Context) {

	var new_student entity.Student
	if err := c.ShouldBindJSON(&new_student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var student entity.Student
	if tx := entity.DB().Where("id = ?", new_student.ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "students not found"})
		return
	}
	student.Name = new_student.Name
	student.Address = new_student.Address
	student.Mark = new_student.Mark
	student.Tel = new_student.Tel
	if err := entity.DB().Save(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}
