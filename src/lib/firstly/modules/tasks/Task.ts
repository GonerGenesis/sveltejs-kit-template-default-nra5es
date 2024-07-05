import { Entity, Field, Fields, ValueListFieldType } from 'remult';
import { KitBaseEnum, LibIcon_Add, LibIcon_Delete, type KitBaseEnumOptions } from 'firstly';

@Entity('tasks', {
	allowApiCrud: true
})
export class Task {
	@Fields.cuid()
	id!: string;

	@Fields.createdAt()
	createdAt?: Date;

	@Fields.string<Task>({
		validate: (task) => {
			if (task.title.length < 3) throw 'The title must be at least 3 characters long';
		}
	})
	title: string = '';

	@Fields.boolean()
	completed: boolean = false;

	@Field(() => TypeOfTaskEnum, { inputType: 'selectEnum' })
	typeOfTask = TypeOfTaskEnum.EASY;
}

@ValueListFieldType()
export class TypeOfTaskEnum extends KitBaseEnum {
	static EASY = new TypeOfTaskEnum('EASY', {
		caption: 'Easy',
		icon: { data: LibIcon_Add }
	});
	static HARD = new TypeOfTaskEnum('HARD', {
		caption: 'Hard',
		icon: { data: LibIcon_Delete }
	});
	constructor(id: string, o?: KitBaseEnumOptions<TypeOfTaskEnum>) {
		super(id, o);
	}
}
