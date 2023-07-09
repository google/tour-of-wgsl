alias ptr_to_i32_in_workgroup = ptr<workgroup, i32>;
alias ptr_to_u32_in_function = ptr<function, u32>;
alias ptr_to_f32_in_private = ptr<private, f32>;
alias ptr_to_vector_in_uniform = ptr<uniform, vec4f>;

alias ptr_to_f32_in_storage_buffer_r = ptr<storage, i32, read>;
alias ptr_to_f32_in_storage_buffer_default = ptr<storage, i32>; // Same as 'read'
alias ptr_to_f32_in_storage_buffer_rw = ptr<storage, i32, read_write>;

//alias bad1 = ptr<private,bool,read>; // Error: only 'storage' can have access mode
//alias bad2= ptr<storage,i32,write>; // Error: 'write' not valid for storage
