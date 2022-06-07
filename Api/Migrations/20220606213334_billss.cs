using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class billss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("a827e9ba-8939-478d-9536-23e4614ef103"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("aba8b6d0-90ec-491f-934a-eef092dad4b0"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("d1135632-5cb6-4bba-8d93-6c01af5c3de0"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("da2747a8-e155-49e9-8b25-b1eedf8c1473"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("e2652b18-9989-4402-aa77-e6948c8850c8"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Bill",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "Bill",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Bill");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "Bill");

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "Name", "OwnerId", "iconClassNameId" },
                values: new object[,]
                {
                    { new Guid("a827e9ba-8939-478d-9536-23e4614ef103"), "Paliwo", null, null },
                    { new Guid("aba8b6d0-90ec-491f-934a-eef092dad4b0"), "Jedzenie", null, null },
                    { new Guid("d1135632-5cb6-4bba-8d93-6c01af5c3de0"), "Rozrywka", null, null },
                    { new Guid("da2747a8-e155-49e9-8b25-b1eedf8c1473"), "Za dziwki i koks", null, null },
                    { new Guid("e2652b18-9989-4402-aa77-e6948c8850c8"), "Opłaty", null, null }
                });
        }
    }
}
