using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MapApp.Migrations
{
    public partial class _0310 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coworkingspace",
                columns: table => new
                {
                    Cw_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(200)", nullable: false),
                    Lon = table.Column<float>(type: "real", nullable: false),
                    Lat = table.Column<float>(type: "real", nullable: false),
                    Url = table.Column<string>(type: "varchar(200)", nullable: true),
                    Descirption = table.Column<string>(type: "varchar(200)", nullable: true),
                    Area_id = table.Column<int>(type: "int", nullable: false),
                    Station_id = table.Column<int>(type: "int", nullable: false),
                    Has_FreeDrink = table.Column<bool>(type: "bit", nullable: false),
                    Is_RecentCreated = table.Column<bool>(type: "bit", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coworkingspace", x => x.Cw_id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coworkingspace");
        }
    }
}
