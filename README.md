# Sign Android APK

```
keytool -genkey -v -keystore dishdash.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias dishdashdine 

// Old and outdated
keytool -genkeypair -v -storetype PKCS12 -keystore dishdash.keystore -alias dishdashdine -keyalg RSA -keysize 2048 -validity 10000
```

PWORD: DishDashDine

Key Alias: dishdashdine
<br><br>

```
What is your first and last name?
  [Unknown]:  Dish Dash Dine
What is the name of your organizational unit?
  [Unknown]:  Food and Drink
What is the name of your organization?
  [Unknown]:  Dish Dash Dine
What is the name of your City or Locality?
  [Unknown]:  United Kingdom
What is the name of your State or Province?
  [Unknown]:  United Kingdom
What is the two-letter country code for this unit?
  [Unknown]:  UK
```
