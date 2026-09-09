# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar el archivo del proyecto
COPY ["AnaYancyPortfolio.csproj", "./"]

# Restaurar dependencias
RUN dotnet restore "AnaYancyPortfolio.csproj"

# Copiar el resto del proyecto
COPY . .

# Publicar la aplicación
RUN dotnet publish "AnaYancyPortfolio.csproj" -c Release -o /app/publish

# Etapa final
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

# Render utiliza el puerto 10000
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "AnaYancyPortfolio.dll"]