# Identity and Access Management (IAM)

IAM == Authentication and Authorization

Unlike a traditional monolithic structure that may have a single security portal, microservices pose many problems. Should each service have it’s own independent security firewall? How should identity be distributed between microservices and throughout my entire system? What is the most efficient method for the exchange of user data?

There are smart techniques that leverage common technologies to not only authorize but perform delegation across your entire system. 

We implement **OAuth** and **OpenID Connect** flows using **JSON Web Tokens** to achieve the end goal of creating a distributed authentication mechanism for microservices — a process of managing identity where everything is self-contained, standardized, secure, and best of all — easy to replicate.

In this lesson we will learn following:

1. Security claims of microservices architecture
2. OAuth
3. OpenID Connect
4. JWT
5. Common Mistakes
6. Authorization per Microservice
7. Multifactor Authentication

## Security claims of microservice architecture

Before digging into OAuth2; it’s important to clarify the claims to a solid security solution.

1. **Central authentication:**
Since microservices is about building mostly independent and autonomous applications, we want to have a consistent authentication experience, so the user won’t notice his requests are served by different applications with possibly individual security configuration.

2. **Statelessness:**
The core benefit of building microservices is scalability. So the chosen security solution shouldn’t affect this. Holding the users session state on server becomes a tricky task, so a stateless solution is highly preferred in this scenario.

3. **User/machine access distinction:**
There is a need of having a clear distinction of different users, and also different machines. Using microservice architecture leads to building a large multi-purpose data-center of different domains and resources, so there is a need to restrict different clients, such as native apps, multiple SPAs etc. in their access.

4. **Fine-grained access control:**
While maintaining centralized roles, there is a need of configuring detailed access control policies in each microservice. A microservice should be unaware of the responsibility of recognizing users, and must just authorize incoming requests.

5. **Safe from attacks:**
No matter how much problems a security solution may solve, it should be strong against vulnerabilities as best as possible.

6. **Scalability:**
Using stateless protocols is not a warranty of the security solution is scalable. In the end, there should not be any single point of failure. A counter-example is a shared auth database or single auth-server-instance, which is hit once per request.

## OAuth

OAuth should be interpreted not as Authentication, and not as Authorization, but as Delegation. In the web realm, the underlying message is there, yet it also means having the ability to offer, accept, or deny the exchange of data

### OAuth Roles/Actors

OAuth has four main roles/actors:

![OAuth Actors](../img/oauth-actors.png)

- Resource Owner (That means, You)
- Client (Means the application you’re using, that accesses your data on the resource server) e.g. web browser
- Resource Server (Where your data are stored) e.g. backend REST API
- Authorization Server (Responsible for authenticating your identity and gives you an authorization token, so that you can request resource server for your data with this token. this token is called access_token) → e.g. KeyCloak

Clients can be public and confidential. There is a significant distinction between the two in OAuth nomenclature. Confidential clients can be trusted to store a secret. They’re not running on a desktop or distributed through an app store. People can’t reverse engineer them and get the secret key. They’re running in a protected area where end users can’t access them.

Public clients are browsers, mobile apps, and IoT devices.

### OAuth Scopes

Scopes are what you see on the authorization screens when an app requests permissions. They’re bundles of permissions asked for by the client when requesting a token. These are coded by the application developer when writing the application.

![OAuth Scopes](../img/oauth-scopes.png)



### OAuth Tokens

**Access Token And Refresh Token**

This two types of token are provided by your authorization server. **access_token** is responsible for accessing your resources from the resource server. This token usually has a little validity time. You can access your data with this token a certain time before it gets expired. So after it expires, you need to request Authorization server for a new access_token with your **refresh_token**, _client id, and client secret_, so that you don’t need to send user credentials again and again. Refresh token has more validation time than Access Token. Typically 7-90 days, depends on you.

So we can say:

- The responsibility of access token is to access data before it gets expired.
- The responsibility of Refresh Token is to request for a new access token when the access token is expired.

Access tokens are the token the client uses to access the Resource Server (API). They’re meant to be short-lived. Think of them in hours and minutes, not days and month. You don’t need a confidential client to get an access token. You can get access tokens with public clients. They’re designed to optimize for internet scale problems. Because these tokens can be short lived and scale out, they can’t be revoked, you just have to wait for them to time out.

The other token is the refresh token. This is much longer-lived; days, months, years. This can be used to get new tokens. To get a refresh token, applications typically require confidential clients with authentication.

Refresh tokens can be revoked. When revoking an application’s access in a dashboard, you’re killing its refresh token. This gives you the ability to force the clients to rotate secrets. What you’re doing is you’re using your refresh token to get new access tokens and the access tokens are going over the wire to hit all the API resources. Each time you refresh your access token you get a new cryptographically signed token. Key rotation is built into the system.

The OAuth spec doesn’t define what a token is. It can be in whatever format you want. Usually though, you want these tokens to be JSON Web Tokens (a standard). In a nutshell, a JWT (pronounced “jot”) is a secure and trustworthy standard for token authentication. JWTs allow you to digitally sign information (referred to as claims) with a signature and can be verified at a later time with a secret signing key. 

#### What will happen if my tokens are compromised?
     
Since you can get access to your data with access_token, if it’s compromised then the hacker will get a very limited ability to get access to resources since it’ll be expired very soon.

If the refresh token is compromised, your resources are still safe because client id and client secret are needed to request for aceess_token, to get access to resources.

### OAuth Grant Types / Flows - When and Why

1. Authorization Code
2. Implicit (e.g. browser to keycloak)
3. Resource Owner Password
4. Client Credential (e.g. backend microservice to keycloak)

#### **1. Authorization Code:**
The Authorization Code flow is the most powerful and most secure by default. When the application redirects the user to the Identity Provider to authenticate, the IdP passes back a short-lived, one-time use authorization code. The application uses the authorization code to retrieve the Access Token.

The important part is twofold: 
- First, by the time the user sees the authorization code, it’s already been consumed and therefore can’t be used again. 
- Second, the Access Token is kept by the application in the backend. Assuming the application is built securely, a malicious user has to find another way to attack it.

Unfortunately, this doesn’t work for client side applications such as many Javascript apps or most mobile apps as the application itself can be attacked or decompiled for sensitive information. Therefore, we need a different approach.

#### **2. Implicit:**
The Implicit flow is designed specifically for mobile apps or client side Javascript apps where embedded credentials could be compromised. The mechanics are simple in that the application redirects the user to the Identity Provider to authenticate, the IdP passes back token(s), and the application uses it according to the scopes it has.

Since it’s quite likely that the user could interact with the token(s), it’s important that our use cases reflect that. If we have a banking app, allowing the send_wire_transfers_to_russia scope may be a bad idea unless we have additional factors baked into our authentication process to validate that the right user is using it. The next time you lose your phone, you’ll appreciate that.

As a result, this is often used for OpenID Connect scenarios where a user wants to provide trusted profile information to a third party but not necessarily access or permissions to other systems. Since the underlying concepts are the same and the implementation looks very similar, it’s most of the benefit for the same effort.

#### **3. Resource Owner Password:**
Compared to the previous grant types, Resource Owner Password makes me nervous. With both the Authorization Code and Implicit flows, the application redirects the user to the Identity Provider to submit their username and password. As a result, the application never sees their credentials. With the Resource Owner Password flow, the application itself accepts the credentials and submits them on behalf of the user.

If the application is malicious or even just poorly developed, it could store those credentials and compromise the user’s information. Therefore, you should only use this if you’re building applications for your users to interact with your legacy systems. For example, a bank may implement this for an internal employee portal.

But remember: Fundamentally, you’re training users to put their credentials into applications they may not trust which is a bad habit at best and a security risk at all times.

#### **4. Client Credential:**
The Client Credential grant type is designed exclusively for backend server to server operations. Think of it as a server’s username and password. Conceptually, it’s not far from how your application connects to other backend systems such as your database or Twilio. The benefit is that your OAuth provider can return configuration information or other details within the token itself.

Finally, since there’s not a user involved, it doesn’t support OpenID Connect.

It's used for communication from microservices to keycloak.

## OpenID Connect



## JWT

JSON Web Tokens, commonly known as JWTs, are tokens that are used to authenticate users on applications. This technology has gained popularity over the past few years because it enables backends to accept requests simply by validating the contents of these JWTs. That is, applications that use JWTS no longer have to hold cookies or other session data about their users. This characteristic facilitates scalability while keeping applications secure.

During the authentication process, when a user successfully logs in using their credentials, a JSON Web Token is returned and must be saved locally (typically in local storage). Whenever the user wants to access a protected route or resource (an endpoint), the user agent (e.g. browser) must send the JWT, usually in the Authorization header using the Bearer schema, along with the request.

When a backend server receives a request with a JWT, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request must be rejected. The following list shows the validation steps needed:

1. Check that the JWT is well formed.
2. Check the signature.
3. Validate the standard claims.
4. Check the Client permissions (scopes).

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA.

Token based authentication schema’s became immensely popular in recent times, as they provide important benefits when compared to sessions/cookies:

- CORS
- No need for CSRF protection
- Better integration with mobile
- Reduced load on authorization server
- No need for distributed session store

Some trade-offs have to be made with this approach:

- More vulnerable to XSS attacks
- Access token can contain outdated authorization claims (e.g when some of the user privileges are revoked)
- Access tokens can grow in size in case of increased number of claims
- File download API can be tricky to implement
- True statelessness and revocation are mutually exclusive

JWT Authentication flow is very simple:

- User obtains Refresh and Access tokens by providing credentials to the Authorization server
- User sends Access token with each request to access protected API resource
- Access token is signed and contains user identity (e.g. user id) and authorization claims.

## The ID Token / Identity Token



## Common mistakes

Here is a brief list of the very major things a developer should be aware of.

1. **Using the same signing key for production and staging:**
It is strictly recommended to use different signing keys as much as possible. Once a signing key gets into wrong hands, it is possible to generate full access granting key without knowing login credentials of any user.

2. **Not using TLS:**
If an attacker manages to intercept an access token, he will gain all the rights authorized to this token, until the token expires. There are a lot of ways to achieve that, in particular when there is no TLS encryption. This was not a problem in the days of version 1 of OAuth, because protocol level encryption was forced.

3. **Using access tokens in URL:**
As of standard, access tokens can be either passed by URL, in headers, or in a cookie. From the TLS point of view, all three ways are secure. In practice passing tokens via URL is less secure, since there several ways of getting the URL from records.

4. **Switching to symmetric signing keys:**
RSA is not required for JWT signing, and Spring Security does provide symmetric token signing as well; which does solve some problems, which make development harder. But this is insecure, since an attacker just needs to get into one single microservice to be able to generate its own JWT tokens.

## Authorization per Microservice

Each microservice should not have to do its own authentication, but it does need to do its own authorization.

Each API should keep track of its own object-level permissions, and it can do so without anything more than a pre-validated userid or groupid. Simply record an object or row that has the id of the object, the id of the user or group, and a set of flags for which permissions they have on that object. That way, when a user tries to do an action on an object, we can join to the appropriate permissions object if it exists, and determine what the user can and can't do to that object. The point is, object-level-permissions exists in the microservice database store without extra user context.

Using this approach we do not require extra user information for authorization such as the username and/or email address - that information is stored elsewhere and only required for authentication.

However, Authentication and Authorization are often mixed – which can lead to serious complexity problems down the line. While Authentication answers the question “who are you?”, Authorization is about the question “what can you do?”. Authentication makes a naturally bounded context (or logical service), in that it has a closed role and needs minimal other information, but Authorization is not that simple. The challenge with Authorization is that in order to answer the question “what can you do?”, the system must have knowledge of what things are possible to do. A very common anti-pattern is the creation of an “Authorization Service”, in an attempt to put Authorization concerns into a single place. This can be appealing on the grounds that all the information about a concept is grouped together, however this means that the “Authorization Service” must know about all the functionality of every other service, and the business rules around who can invoke this functionality and based on what conditions. This is a very common source of major architectural problems, as a result of individual services being unable to perform their job autonomously, and a single service (Authorization) having an intimate knowledge of the workings of other services. The purpose when designing services in a service-oriented or microservices architecture is to create independent logically bounded components, that can version independently, and function in isolation. At runtime, service boundaries form fault partitions, where if one service is offline, other services should be able to continue to work. Allowing a single service to hold knowledge about other services violates these principles.

Reference: 

- http://richardwellum.com/2017/04/authentication-authorization-and-bounded-contexts/

## Multifactor Authentication

Multifactor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. This method provides an additional layer of security, decreasing the likelihood of unauthorized access. The type of information required from the user is typically two or more of the following:

- **Knowledge**: Something the user knows (e.g. a password)
- **Possession**: Something the user has (e.g. a cell phone)
- **Inheritance**: Something the user is (e.g. a fingerprint or retina scan)

## References

Worth reading:

- https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth
