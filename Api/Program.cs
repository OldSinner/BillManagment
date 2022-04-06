

//Add Configuration 
using Api.Data;
using Microsoft.EntityFrameworkCore;

var config = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: true)
        .Build();
//Builder -----------------------------------------
var builder = WebApplication.CreateBuilder(args);
//Database -----------------------------------------
builder.Services.AddDbContext<Context>(x => x.UseMySql("", new MySqlServerVersion(new Version(8, 0, 21))));
//End Database
//Cors 
builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
   {
       builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
   }));
//End Cors ------------------------------------------
var app = builder.Build();
// End Buidler --------------------------------------
// App Section --------------------------------------
if (app.Environment.IsDevelopment())
{
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
//End App
