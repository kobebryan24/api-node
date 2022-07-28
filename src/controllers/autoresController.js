import autores from '../models/Autores.js';
class AutorController {
    static listarautores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores)

        })
    }
    static listarAtoresPorId = (req, res) => {
        const id = req.params.id;
        autores.findById(id, (err, autores) => {
            if (err) {
                res.status(400).send({
                    message: `${err.message} autor nao encontrado`
                });
            } else {
                console.log(autores)
                res.status(200).send(autores)
            }
        })
    }
    static cadastrarAutor = (req, res) => {
        let autor = new autores(req.body);
        console.log(req.body)
        autor.save((err) => {
            if (err) {
                res.status(500).send({
                    message: `${err.message} falha ao cadastrar o autor`
                });
            } else {
                res.status(201).send(autor.toJSON())
            }
        })
    }
    static atualizarAutor = (req, res) => {
        const id = req.params.id;
        console.log(req.body)
        autores.findByIdAndUpdate(id, {
            $set: req.body
        }, (err) => {
            if (!err) {
                res.status(200).send({
                    message: 'autor att com sucesso'
                });
            } else {
                res.status(500).send({
                    message: `${err.message} falha ao att`
                });
            }
        })
    }
    static excluirAutor = (req, res) => {
        let id = req.params.id;
        autores.findByIdAndDelete(id, (err, autor) => {
            if (err) {
                res.status(500).send({
                    message: `${err.message} autor nao encontrado`
                })
            } else {
                res.status(200).send(autor)
            }
        })
    }
}
export default AutorController;