# REST API em Node.js e Express.js - Cadastro e manipulação de automóveis, motoristas e registros de uso. Nesta aplicação foram implementados CRUDs em seus padrões. Foi feito em Node usando a arquitetura REST.
 <br>

# Tecnologias Utilizadas: <br>

Node.js 18.2.0 <br>
Insomnia 2022.5.0 <br>
MongoDB Compass 1.32.6 <br>

# Dependências

<ul>
  <li> bcrypt 5.0.1 </li>  
  <li> dotenv 16.0.1 </li> 
  <li> express 4.18.1 </li>  
  <li> jsonwebtoken 8.5.1 </li>  
  <li> mongoose 6.5.2 </li>  
  <li> nodemon 2.0.19 (como devDependencies) </li>
</ul>

# Guia

<ol dir="auto">
  <li>É necessário clonar o repositório com o comando <code>git clone https://github.com/AndreCorrea/automanager_backend.git</code></li>
  <li>Entrar no diretório do projeto</li>
  <li>Instalar todas as dependências utilizando <code>yarn install ou npm install</code></li>
  <li>Instalar o Insomnia e importar o seguinte arquivo (<a href="https://gist.github.com/AndreCorrea/8860d2d214290efe7923f2012eed03c3" target="_blank">Baixar arquivo de importação</a>) para conseguir utilizar todas as rotas usadas nos testes</code></li>
  <li>Após isso, rodar a aplicação utilizando <code>yarn start ou npm start</code></li>
</ol>

# Variáveis de testes

<ol>
  <li> A aplicação irá rodar na porta 5000. Para alterá-la caso precise, basta alterar o valor da constante <code>const portHost = 5000</code> localizada em <code>server.js</code> </li>
  <li> Foi utilizado o cluster do MongoDb (remoto) para criação de dados. Para usá-lo ou adicionar outro banco de dados dentro do MongoDb, basta adicionar os seguintes dados dentro de um arquivo .env:
    <ul>
      <li> <code> DB_USER={INSIRA O VALOR} </code> </li>
      <li> <code> DB_NAME={INSIRA O VALOR} </code> </li>
      <li> <code> DB_PASS={INSIRA O VALOR} </code> </li>
      <li> <code> DB_CLUSTER={INSIRA O VALOR} </code> </li>
    </ul>
  </li>
  <li> É preciso criar uma variável <code> SECRET_TOKEN={INSIRA O VALOR} </code> dentro do arquivo .env. Ela é usada para assinar e verificar o token criado para os usuários que logam. </li>
  <li> Dentro do Insomnia foram criadas duas variáveis para facilitar os testes, dentro de "Environments": <b>BASE</b> e <b>Token</b>, em <b>BASE</b> está a estrutura de nossa URL e em <b>Token</b> você pode colocar de um usuário criado (crie e logue com um usuário company no teste para pegar o token), para facilitar os testes posteriores a criação do usuário. </li>
</ol>

# Observações

A arquitetura Rest dos testes estão em ordem de criação e utilização no Insomnia, com todas as rotas acessíveis.

É importante dizer que, caso você queira utilizar o MongoDb Compass (local), basta adicionar a String de conexão em <code>/src/config/database na lina 9</code>

# Testes

Foram totalmente realizados no ambiente automatizado do Insomnia, onde foi criado uma collection com 20 testes em 4 pastas separadas e organizadas, comprovando o sucesso de cada funcionalidade. Os testes que foram feitos nesse caso podem ser vistos na figura abaixo, logo na aba a esquerda. O Insomnia é uma ferramenta extremamente útil para se testar manualmente ou automatizar os testes de qualquer API REST.

![image](https://user-images.githubusercontent.com/6698664/185702711-41d8acec-de1d-48ab-af69-53eaff305a02.png)

# Créditos
Essa API foi desenvolvida e documentada por André Correa, no dia 19/08/2022.

