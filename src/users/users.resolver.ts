import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Args, Field, InputType, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { assign } from 'src/utils/assign';
import { User } from './users.model';

@InputType()
class CreateUserInput {
  @Field()
  name!: string;

  @Field()
  age!: number;
}

const users: User[] = [];

@Resolver(() => User)
export class UsersResolver {
  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const existingUser = users.find((user) => user.name === input.name);

    if (existingUser) {
      throw new BadRequestException({ validationErrors: { name: 'Name already exists.' } });
    }

    const user = assign(new User(), input, {
      id: users.length + 1,
    });

    users.push(user);
    return users[users.length - 1];
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return users;
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const user = users[id - 1];
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
