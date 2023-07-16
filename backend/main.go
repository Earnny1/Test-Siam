package main

import (
	"github.com/gin-gonic/gin"

	"github.com/Earnny1/tase-siam/entity"
	"github.com/Earnny1/tase-siam/controller"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// Student Routes
	r.GET("/students", controller.ListStudents)
	r.GET("/student/:id", controller.GetStudent)
	r.POST("/students", controller.CreateStudent)
	r.PATCH("/students", controller.UpdateStudent)
	r.DELETE("/students/:id", controller.DeleteStudent)

	// Run the server

	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
