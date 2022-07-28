import livros from "../models/Livro.js";
class LivroController {
    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
                res.status(200).json(livros)

            })
    }
    static listarLivrosPorId = (req, res) => {
        const id = req.params.id;
        livros.findById(id)
            .populate('autor', 'nome')
            .exec((err, livros) => {
                if (err) {
                    res.status(400).send({
                        message: `${err.message} livro nao encontrado`
                    });
                } else {
                    console.log(livros)
                    res.status(200).send(livros)
                }
            })
    }
    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);
        console.log(req.body)
        livro.save((err) => {
            if (err) {
                res.status(500).send({
                    message: `${err.message} falha ao cadastrar o livro`
                });
            } else {
                res.status(201).send(livro.toJSON())
            }
        })
    }
    static atualizarLivro = (req, res) => {
        const id = req.params.id;
        console.log(req.body)
        livros.findByIdAndUpdate(id, {
            $set: req.body
        }, (err) => {
            if (!err) {
                res.status(200).send({
                    message: 'livro att com sucesso'
                });
            } else {
                res.status(500).send({
                    message: `${err.message} falha ao att`
                });
            }
        })
    }
    static excluirLivro = (req, res) => {
        let id = req.params.id;
        livros.findByIdAndDelete(id, (err, livro) => {
            if (err) {
                res.status(500).send({
                    message: `${err.message} livro nao encontrado`
                })
            } else {
                res.status(200).send(livro)
            }
        })
    }
    static listarLivrosPorEditora = (req, res) => {
        const editora = req.query.editora;
        console.log(editora)
        livros.find({
            'editora': editora
        }, {}, (err, livros) => {
            res.status(200).send(livros)
        })
    }
}
export default LivroController;