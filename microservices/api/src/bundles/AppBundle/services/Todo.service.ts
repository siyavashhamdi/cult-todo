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

  protected getLastPositionedTodo = async (
    createdById: ObjectId,
    isChecked?: boolean
  ) => {
    const query = { createdById } as Todo;

    if (isChecked !== undefined) {
      query.isChecked = isChecked;
    }

    const res = await this.todosCollection
      .find(query)
      .sort({ position: -1 })
      .limit(1)
      .toArray();

    return res.length ? res[0] : null;
  };

  public async create(
    input: EndUsersTodosCreateInput,
    userId: ObjectId
  ): Promise<Todo> {
    const lastPositionedTodo = await this.getLastPositionedTodo(userId, false);
    const nextPosition = lastPositionedTodo?.position + 1 || 0;

    const resInsert = await this.todosCollection.insertOne({
      title: input.title,
      isChecked: false,
      position: nextPosition,
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
    const $set = { updatedAt: new Date() } as Todo;

    if (input.position !== undefined) {
      $set.position = input.position;
    }

    if (input.isChecked !== undefined) {
      $set.isChecked = input.isChecked;

      if (input.position === undefined) {
        const lastPositionedTodo = await this.getLastPositionedTodo(
          _userId,
          input.isChecked
        );

        $set.position = lastPositionedTodo?.position + 1 || 0;
      }
    }

    await this.todosCollection.updateOne({ _id: todoId }, { $set });

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

  public async count(createdById: ObjectId) {
    return this.todosCollection.count({ createdById });
  }
}
