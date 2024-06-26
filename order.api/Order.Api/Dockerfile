﻿FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Order.Api/Order.Api.csproj", "Order.Api/"]
COPY ["Order.Persistence/Order.Persistence.csproj", "Order.Persistence/"]
COPY ["Order.Core/Order.Core.csproj", "Order.Core/"]
COPY ["Order.Application/Order.Application.csproj", "Order.Application/"]
RUN dotnet restore "Order.Api/Order.Api.csproj"
COPY . .
WORKDIR "/src/Order.Api"
RUN dotnet build "Order.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Order.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Order.Api.dll"]
