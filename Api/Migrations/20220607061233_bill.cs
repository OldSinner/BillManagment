using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class bill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("0f898e60-9149-4647-83df-81c785286dc1"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("4fc42723-c7c0-4d18-a3e9-b00839d04639"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("70dcc456-7d76-4913-8e65-bf942118a447"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("7b94e550-8400-4697-b932-215c48d351fb"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("fb7b94de-2403-46ba-8435-1e7f3c122428"));

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Bill",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "Name", "OwnerId", "iconClassNameId" },
                values: new object[,]
                {
                    { new Guid("00ffeb2d-2e61-4411-a617-b548c4026ad8"), "Opłaty", null, null },
                    { new Guid("063146d1-4c72-4c71-826f-fc68744311f6"), "Za dziwki i koks", null, null },
                    { new Guid("4f96b0b3-3abb-4f89-b0dc-e09e6b3ff6cc"), "Rozrywka", null, null },
                    { new Guid("55b4a9b0-1b84-41cd-9078-2339ae496ee3"), "Paliwo", null, null },
                    { new Guid("d10813ae-25d4-4e9c-a990-4d0f20139f18"), "Jedzenie", null, null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("00ffeb2d-2e61-4411-a617-b548c4026ad8"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("063146d1-4c72-4c71-826f-fc68744311f6"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("4f96b0b3-3abb-4f89-b0dc-e09e6b3ff6cc"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("55b4a9b0-1b84-41cd-9078-2339ae496ee3"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("d10813ae-25d4-4e9c-a990-4d0f20139f18"));

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Bill");

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "Name", "OwnerId", "iconClassNameId" },
                values: new object[,]
                {
                    { new Guid("0f898e60-9149-4647-83df-81c785286dc1"), "Paliwo", null, null },
                    { new Guid("4fc42723-c7c0-4d18-a3e9-b00839d04639"), "Opłaty", null, null },
                    { new Guid("70dcc456-7d76-4913-8e65-bf942118a447"), "Rozrywka", null, null },
                    { new Guid("7b94e550-8400-4697-b932-215c48d351fb"), "Za dziwki i koks", null, null },
                    { new Guid("fb7b94de-2403-46ba-8435-1e7f3c122428"), "Jedzenie", null, null }
                });
        }
    }
}
