FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN apt-get install nodejs npm

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY ["/Lab5.PL/Lab5.PL.csproj", "Lab5.PL/"]
RUN dotnet restore "Lab5.PL/Lab5.PL.csproj"

COPY ["/Lab5.BLL/Lab5.BLL.csproj", "Lab5.BLL/"]
RUN dotnet restore "Lab5.BLL/Lab5.BLL.csproj"

COPY ["/Lab5.DAL/Lab5.DAL.csproj", "Lab5.DAL/"]
RUN dotnet restore "Lab5.DAL/Lab5.DAL.csproj"
COPY . .

WORKDIR "/src/Lab5.PL/ClientApp"
RUN npm install

WORKDIR "/src/Lab5.PL"
RUN dotnet build "Lab5.PL.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Lab5.PL.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Lab5.PL.dll"]
