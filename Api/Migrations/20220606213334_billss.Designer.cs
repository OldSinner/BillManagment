﻿// <auto-generated />
using System;
using Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20220606213334_billss")]
    partial class billss
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Api.Models.Bill", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<float>("Amount")
                        .HasColumnType("float");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("OwnerId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Bill");
                });

            modelBuilder.Entity("Api.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid?>("OwnerId")
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("iconClassNameId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.HasIndex("iconClassNameId");

                    b.ToTable("Category");

                    b.HasData(
                        new
                        {
                            Id = new Guid("fb7b94de-2403-46ba-8435-1e7f3c122428"),
                            Name = "Jedzenie"
                        },
                        new
                        {
                            Id = new Guid("70dcc456-7d76-4913-8e65-bf942118a447"),
                            Name = "Rozrywka"
                        },
                        new
                        {
                            Id = new Guid("4fc42723-c7c0-4d18-a3e9-b00839d04639"),
                            Name = "Opłaty"
                        },
                        new
                        {
                            Id = new Guid("7b94e550-8400-4697-b932-215c48d351fb"),
                            Name = "Za dziwki i koks"
                        },
                        new
                        {
                            Id = new Guid("0f898e60-9149-4647-83df-81c785286dc1"),
                            Name = "Paliwo"
                        });
                });

            modelBuilder.Entity("Api.Models.Icon", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("className")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Icon");
                });

            modelBuilder.Entity("Api.Models.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("Api.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<byte[]>("Password")
                        .IsRequired()
                        .HasColumnType("longblob");

                    b.Property<DateTime>("RegisterDate")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Api.Models.Bill", b =>
                {
                    b.HasOne("Api.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Api.Models.Category", b =>
                {
                    b.HasOne("Api.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");

                    b.HasOne("Api.Models.Icon", "iconClassName")
                        .WithMany()
                        .HasForeignKey("iconClassNameId");

                    b.Navigation("Owner");

                    b.Navigation("iconClassName");
                });

            modelBuilder.Entity("Api.Models.User", b =>
                {
                    b.HasOne("Api.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });
#pragma warning restore 612, 618
        }
    }
}
