import { Service, ContainerInstance } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { Todo, TodosCollection } from "../collections";
import { EndUsersTodosCreateInput, EndUsersTodosUpdateInput } from "./inputs";

@Service()
export class TodoService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly todosCollection: TodosCollection
  ) {}

  public async create(
    input: EndUsersTodosCreateInput,
    userId: ObjectId
  ): Promise<Todo> {
    const resInsert = await this.todosCollection.insertOne({
      title: input.title,
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdById: userId,
    });

    return this.todosCollection.findOne({ _id: resInsert.insertedId });
  }

  public async read(createdById: ObjectId) {
    return this.todosCollection.find({ createdById }).toArray();
  }

  public async update(
    todoId: ObjectId,
    input: EndUsersTodosUpdateInput,
    _userId: ObjectId
  ): Promise<Todo> {
    await this.todosCollection.updateOne(
      {
        _id: todoId,
      },
      {
        $set: {
          isChecked: input.isChecked,
          updatedAt: new Date(),
        },
      }
    );

    return this.todosCollection.findOne({ _id: todoId });
  }

  public async delete(todoId: ObjectId): Promise<boolean> {
    await this.todosCollection.updateOne(
      {
        _id: todoId,
      },
      {
        $set: {
          isDeleted: true,
          updatedAt: new Date(),
        },
      }
    );

    return true;
  }
}
