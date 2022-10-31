using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class month : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "Name", "OwnerId", "iconClassNameId" },
                values: new object[,]
                {
                    { new Guid("33cc3766-1c27-4516-8e12-c5d1cd9517a6"), "Rozrywka", null, null },
                    { new Guid("3400ed3d-a078-48e9-960a-622c74dbff55"), "Jedzenie", null, null },
                    { new Guid("901bd09a-9969-46a7-812e-b9ff854144ec"), "Opłaty", null, null },
                    { new Guid("9bf91b6e-853a-40f6-8763-f5b654c57da5"), "Za dziwki i koks", null, null },
                    { new Guid("f76b4278-53b1-44e2-a399-6048f309d4f5"), "Paliwo", null, null }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("1b982032-6097-4dc5-a9d7-478dcb684e66"), "USER" },
                    { new Guid("dd45a2ed-7345-4b07-ba7f-0036a159b52d"), "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("33cc3766-1c27-4516-8e12-c5d1cd9517a6"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("3400ed3d-a078-48e9-960a-622c74dbff55"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("901bd09a-9969-46a7-812e-b9ff854144ec"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("9bf91b6e-853a-40f6-8763-f5b654c57da5"));

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: new Guid("f76b4278-53b1-44e2-a399-6048f309d4f5"));

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("1b982032-6097-4dc5-a9d7-478dcb684e66"));

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("dd45a2ed-7345-4b07-ba7f-0036a159b52d"));

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
    }
}
