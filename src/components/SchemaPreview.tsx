import { Foldable } from '@/components/FoldableSchema';

type ObjectSchema = { type: 'object'; properties: Record<string, any> };
type ArraySchema = { type: 'array'; item: Schema };
type UnionSchema = { type: 'union'; items: Schema[] };
type LiteralSchema = { type: 'literal'; value: any };
type OptionalSchema = { type: 'optional'; value: Schema };
type NullableSchema = { type: 'nullable'; value: Schema };
type RecordSchema = { type: 'record'; elementType: Schema };
type UnknownSchema = { type: 'unknown' };
type StringSchema = { type: 'string' };
type NumberSchema = { type: 'number' };
type BooleanSchema = { type: 'boolean' };

type Schema =
  | ObjectSchema
  | ArraySchema
  | UnionSchema
  | LiteralSchema
  | OptionalSchema
  | NullableSchema
  | RecordSchema
  | UnknownSchema
  | StringSchema
  | NumberSchema
  | BooleanSchema;

function getPropertyTypeLabel(schema: Schema) {
  if (schema.type === 'array') {
    return `array of ${getPropertyTypeLabel(schema.item)}s`;
  }
  if (schema.type === 'object') {
    if (Object.keys(schema.properties).length === 0) {
      return 'empty object';
    }
    return 'object';
  }
  if (schema.type === 'string') {
    return 'string';
  }
  if (schema.type === 'number') {
    return 'number';
  }
  if (schema.type === 'boolean') {
    return 'boolean';
  }
  if (schema.type === 'union') {
    const types = schema.items.map(getPropertyTypeLabel);
    // count unique types
    const uniqueTypes = [...new Set(types)].map(type => {
      if (types.filter(t => t === type).length > 1) {
        return type + 's';
      }
      return type;
    });

    return `union of ${uniqueTypes.join(' and ')}`;
  }
  if (schema.type === 'literal') {
    return 'literal';
  }
  if (schema.type === 'optional') {
    return `optional ${getPropertyTypeLabel(schema.value)}`;
  }
  if (schema.type === 'nullable') {
    return `nullable ${getPropertyTypeLabel(schema.value)}`;
  }
  if (schema.type === 'record') {
    return `record of ${getPropertyTypeLabel(schema.elementType)}s`;
  }
  if (schema.type === 'unknown') {
    return 'object';
  }
}

type PropertyTypeLabelProps = Schema;

function PropertyTypeLabel(props: PropertyTypeLabelProps) {
  return <span className='text-xs text-charcole-700'>{getPropertyTypeLabel(props)}</span>;
}

type PropertyLabelProps = Schema & {
  parent?: string;
  name: string;
};

function PropertyLabel({ parent, name, ...rest }: PropertyLabelProps) {
  return (
    <p className='flex items-center gap-1'>
      <code className='leading-none'>
        {parent ? <>{parent}.</> : null}
        <span className='font-bold'>{name}</span>
      </code>
      <PropertyTypeLabel {...rest} />
    </p>
  );
}

interface ObjectSchemaProps {
  schema: ObjectSchema;
  parent?: string;
}
function ObjectSchema({ schema, parent }: ObjectSchemaProps) {
  return (
    <div>
      <ul className='my-4 rounded-md border border-charcole-900 px-4 py-2'>
        {Object.keys(schema.properties).map(key => {
          let property = schema.properties[key];
          const isNullable = property.type === 'nullable';
          property = isNullable ? property.value : property;
          const isOptional = property.type === 'optional';
          property = isOptional ? property.value : property;
          const isObject = property.type === 'object';
          const isArray = property.type === 'array';
          const isUnion = property.type === 'union';

          const isEmptyObject = isObject && Object.keys(property.properties).length === 0;

          const isFoldable = !isEmptyObject || (isArray ? !isEmptyObject : false);

          const newParent = parent ? `${parent}.${key}` : key;

          if (isUnion) {
            return (
              <li key={key} className='my-4'>
                <PropertyLabel parent={parent} name={key} {...schema.properties[key]} />
                <Foldable title='Show possible variants' closeTitle='Hide possible variants'>
                  <ul className=' my-4 rounded-md'>
                    {property.items.map((item, index) => (
                      <li key={index} className='my-4'>
                        <Content schema={item} parent={newParent} />
                      </li>
                    ))}
                  </ul>
                </Foldable>
              </li>
            );
          }

          if (isFoldable) {
            return (
              <li key={key} className='my-4'>
                <PropertyLabel parent={parent} name={key} {...schema.properties[key]} />
                <Foldable>
                  <Content schema={property} parent={newParent} />
                </Foldable>
              </li>
            );
          }

          return (
            <li key={key} className='my-4'>
              <PropertyLabel parent={parent} name={key} {...schema.properties[key]} />
              {!isEmptyObject ? <Content schema={property} parent={newParent} /> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface ContentProps {
  schema: Schema;
  parent?: string;
}

function Content({ schema, parent = undefined }: ContentProps) {
  if (schema.type === 'object') {
    return <ObjectSchema schema={schema} parent={parent} />;
  }
  if (schema.type === 'array') {
    return (
      <div>
        <Content schema={schema.item} />
      </div>
    );
  }
  return null;
}

export function SchemaPreview({ schema }) {
  return (
    <div className='text-white'>
      {schema.type === 'object' ? <ObjectSchema schema={schema} /> : <Content schema={schema} />}
    </div>
  );
}
