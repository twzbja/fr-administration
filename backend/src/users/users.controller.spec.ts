import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
  
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  //it prend 2 parametres : un string, qui explicite ce que le test vérifie, et une fonction qui est le test.
  it('should be defined', () => {
    //on s'attend que la variable controller soit définie.
    expect(controller).toBeDefined();
  });


  describe('getAll', () => {
    it('should return an array of users', async () => {
      //Oracle (expected qui sera compare qu retour de l'API que nous testons)
      const expected = Promise.all([{ 
          id: 0, 
          firstname: 'John',
          lastname: 'Doe',
          age: 23,
          password: '1234'
      }]);
      /*On utilise Jest pour mocker le service, c'est-à-dire que l'on crée une "fausse" implémentation
      de la méthode getAll() (du service cette fois-ci !)
      en la faisant simplement retourner la valeur expected
      */
      jest.spyOn(service, 'getAll').mockImplementation(() => expected);

      //Finalement, on appelle la méthode getAll() du contrôleur (la méthode que l'on veut tester), 
      //et on la compare à la valeur oracle créée en 1
      expect(await controller.getAll()).toBe(await expected);
    });
  });


  describe('getById', () => {
    it('should return a single user, with the provided id', async () => {
      const expected = await Promise.all([{ 
        id: 0, 
        firstname: 'John',
        lastname: 'Doe',
        age: 23,
        password: 'password'
      }]);

      jest.spyOn(service, 'getById').mockImplementation(id => {
        return Promise.resolve(expected[id]);
      });
      expect(await controller.getById({id: 0})).toBe(await expected[0]);
    })
  });
});
